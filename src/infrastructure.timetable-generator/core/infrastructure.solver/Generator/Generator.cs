using System.Threading.Channels;
using Google.OrTools.Sat;
using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Constraints;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

/// <summary>
///     Main entry point for timetable generation. Orchestrates validation,
///     constraint application, optimization, and solution streaming.
/// </summary>
public class Generator : IGenerator
{
    private static readonly Dictionary<ConstraintKind, Func<IConstraint>> ConstraintFactories = new()
    {
        [ConstraintKind.GroupOneScheduleAtSameTime] = () => new ConstraintGroupOneScheduleAtSameTime(),
        [ConstraintKind.TeacherOneScheduleAtSameTime] = () => new ConstraintTeacherOneScheduleAtSameTime(),
        [ConstraintKind.DiaryLimitSchedulesInOneWeek] = () => new ConstraintDiaryLimitSchedulesInOneWeek(),
        [ConstraintKind.DiaryLimitRemaining] = () => new ConstraintDiaryLimitRemaining(),
        [ConstraintKind.TeacherLunch] = () => new ConstraintTeacherLunch(),
        [ConstraintKind.GroupLunch] = () => new ConstraintGroupLunch(),
        [ConstraintKind.TeacherNoOppositeTurns] = () => new ConstraintTeacherNoOppositeTurns(),
        [ConstraintKind.Teacher12Hours] = () => new ConstraintTeacher12Hours(),
        [ConstraintKind.GroupNoOverlappingTimeSlots] = () => new ConstraintGroupNoOverlappingTimeSlots(),
        [ConstraintKind.TeacherNoOverlappingTimeSlots] = () => new ConstraintTeacherNoOverlappingTimeSlots(),
        [ConstraintKind.RoomOneScheduleAtSameTime] = () => new ConstraintRoomOneScheduleAtSameTime(),
    };

    private static readonly ConstraintKind[] AllConstraintKinds = Enum.GetValues<ConstraintKind>();

    private readonly ITimetableOptimizer _optimizer = new TimetableOptimizer();
    private readonly IScheduleCombinationGenerator _combinationGenerator;
    private readonly SolverOptions _solverOptions;

    public Generator(IScheduleCombinationGenerator combinationGenerator)
        : this(combinationGenerator, new SolverOptions())
    {
    }

    public Generator(IScheduleCombinationGenerator combinationGenerator, SolverOptions solverOptions)
    {
        _combinationGenerator = combinationGenerator;
        _solverOptions = solverOptions;
    }

    /// <summary>
    ///     Generates timetable solutions for the given request, iteratively improving
    ///     quality. Yields results as they are found by the solver.
    /// </summary>
    public IEnumerable<GeneratedTimetable> GenerateTimetables(
        GenerateRequest request,
        IAvailabilityEvaluator availabilityEvaluator)
    {
        ValidateDiaryReferences(request);

        var generationContext = CreateContextWithRestrictionsApplied(request, availabilityEvaluator);

        FixarAulas(generationContext, request);

        if (generationContext.AllProposals.Count == 0)
        {
            yield return CreateEmptyTimetable(request);
            yield break;
        }

        var channel = Channel.CreateBounded<GeneratedTimetable>(
            new BoundedChannelOptions(_solverOptions.ChannelCapacity)
            {
                FullMode = BoundedChannelFullMode.DropOldest,
            });
        var solverTask = Task.Run(() => SolveAndWriteToChannel(channel.Writer, generationContext, request));

        foreach (var timetable in ReadChannel(channel.Reader))
            yield return timetable;

        solverTask.GetAwaiter().GetResult();
    }

    /// <summary>
    ///     Generates all possible schedule combinations, filtering by availability.
    /// </summary>
    public IEnumerable<GenerationScheduleCombination> GetAllCombinationsWithAvailability(
        GenerateRequest generateRequest,
        IAvailabilityEvaluator availabilityEvaluator)
        => _combinationGenerator.GetAllCombinationsWithAvailability(
            generateRequest, availabilityEvaluator);

    private static IConstraint[] BuildConstraints(GenerateRequest request)
    {
        var enabledKinds = request.EnabledConstraints ?? AllConstraintKinds;
        return enabledKinds
            .Where(ConstraintFactories.ContainsKey)
            .Select(kind => ConstraintFactories[kind]())
            .ToArray();
    }

    private GenerationContext CreateContextWithRestrictionsApplied(
        GenerateRequest request,
        IAvailabilityEvaluator availabilityEvaluator)
    {
        var generationContext = new GenerationContext(request, availabilityEvaluator, _combinationGenerator);

        foreach (var constraint in BuildConstraints(request))
            constraint.Apply(generationContext);

        _optimizer.OptimizeResult(generationContext);

        return generationContext;
    }

    private static void ValidateDiaryReferences(GenerateRequest request)
    {
        if (request.Diaries is null) return;

        var groupIds = new HashSet<string>(request.Groups.Select(g => g.Id));
        var teacherIds = new HashSet<string>(request.Teachers.Select(t => t.Id));

        foreach (var diary in request.Diaries)
        {
            if (!groupIds.Contains(diary.GroupId) && !teacherIds.Contains(diary.TeacherId))
                throw new GeneratorValidationException(GeneratorValidationErrorCode.DiaryReferencesNotFound, "Diary references not found: group and teacher not found.");
            if (!groupIds.Contains(diary.GroupId))
                throw new GeneratorValidationException(GeneratorValidationErrorCode.GroupNotFound, $"Group not found: {diary.GroupId}.");
            if (!teacherIds.Contains(diary.TeacherId))
                throw new GeneratorValidationException(GeneratorValidationErrorCode.TeacherNotFound, $"Teacher not found: {diary.TeacherId}.");
        }
    }

    private static GeneratedTimetable CreateEmptyTimetable(GenerateRequest request)
    {
        return new GeneratedTimetable(
            new TimetableGrid(request.DateStart, request.DateEnd, request.TimeSlots, Array.Empty<TimetableGridSchedule>()),
            0
        );
    }

    private void SolveAndWriteToChannel(
        ChannelWriter<GeneratedTimetable> writer,
        GenerationContext generationContext,
        GenerateRequest request)
    {
        try
        {
            var producedAny = RunSolverIterations(writer, generationContext);

            if (!producedAny)
                writer.TryWrite(CreateEmptyTimetable(request));
        }
        finally
        {
            writer.Complete();
        }
    }

    private static void FixarAulas(GenerationContext context, GenerateRequest request)
    {
        foreach (var fixa in request.FixedSchedules)
        {
            var proposta = context.AllProposals.FirstOrDefault(candidata =>
                candidata.DiaryId == fixa.DiaryId
                && candidata.GroupId == fixa.GroupId
                && candidata.TeacherId == fixa.TeacherId
                && candidata.Date == fixa.Date
                && candidata.TimeSlot.Start == fixa.TimeSlot.Start
                && candidata.TimeSlot.End == fixa.TimeSlot.End);

            if (proposta is null)
                throw new GeneratorValidationException(
                    GeneratorValidationErrorCode.FixedScheduleNotSchedulable,
                    $"Aula fixa sem proposta possivel: diario {fixa.DiaryId} em {fixa.Date} {fixa.TimeSlot.Start}.");

            context.CpModel.Add(proposta.ModelBoolVar == 1);
        }
    }

    private bool RunSolverIterations(
        ChannelWriter<GeneratedTimetable> writer,
        GenerationContext generationContext)
    {
        long? previousScore = null;
        var producedAny = false;
        var cronometro = System.Diagnostics.Stopwatch.StartNew();

        do
        {
            var restante = TempoRestante(cronometro);

            if (restante is <= 0)
                break;

            if (previousScore != null)
                _optimizer.OptimizeResult(generationContext, previousScore - 1);

            previousScore = SolveIteration(generationContext, writer, ref producedAny, restante);
        } while (previousScore > 0);

        return producedAny;
    }

    private double? TempoRestante(System.Diagnostics.Stopwatch cronometro)
    {
        if (_solverOptions.MaxTimeSeconds is not { } orcamento)
            return null;

        return orcamento - cronometro.Elapsed.TotalSeconds;
    }

    private long SolveIteration(
        GenerationContext generationContext,
        ChannelWriter<GeneratedTimetable> writer,
        ref bool producedAny,
        double? tempoRestante)
    {
        var parametros = "enumerate_all_solutions:true";

        if (tempoRestante is { } segundos)
            parametros += $",max_time_in_seconds:{segundos.ToString(System.Globalization.CultureInfo.InvariantCulture)}";

        var solver = new CpSolver { StringParameters = parametros };
        var localProducedAny = producedAny;

        var solutionPrinter = new GeneratorSolutionCallback(
            generationContext,
            timetable =>
            {
                localProducedAny = true;
                writer.TryWrite(timetable);
            },
            _solverOptions.MaxSolutionsPerIteration
        );

        var sat = solver.Solve(generationContext.CpModel, solutionPrinter);
        producedAny = localProducedAny;

        return sat is CpSolverStatus.Feasible or CpSolverStatus.Optimal
            ? (long)solver.ObjectiveValue
            : 0;
    }

    private static IEnumerable<GeneratedTimetable> ReadChannel(ChannelReader<GeneratedTimetable> reader)
    {
        while (reader.WaitToReadAsync().AsTask().GetAwaiter().GetResult())
        {
            while (reader.TryRead(out var item))
                yield return item;
        }
    }
}
