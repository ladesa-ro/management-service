import { Type as _Type } from "class-transformer";
import {
  IsArray as _IsArray,
  IsBoolean as _IsBoolean,
  IsDateString as _IsDateString,
  IsEmail as _IsEmail,
  IsIn as _IsIn,
  IsInt as _IsInt,
  IsNotEmpty as _IsNotEmpty,
  IsOptional as _IsOptional,
  IsString as _IsString,
  IsUUID as _IsUUID,
  Length as _Length,
  Max as _Max,
  Min as _Min,
  MinLength as _MinLength,
  ValidateNested as _ValidateNested,
} from "class-validator";
import { mixable } from "../mixable";

export const IsNotEmpty = mixable(_IsNotEmpty);
export const IsOptional = mixable(_IsOptional);
export const IsString = mixable(_IsString);
export const IsUUID = mixable(_IsUUID);
export const IsArray = mixable(_IsArray);
export const IsInt = mixable(_IsInt);
export const IsBoolean = mixable(_IsBoolean);
export const IsDateString = mixable(_IsDateString);
export const IsEmail = mixable(_IsEmail);
export const IsIn = mixable(_IsIn);
export const Length = mixable(_Length);
export const ValidateNested = mixable(_ValidateNested);
export const MinLength = mixable(_MinLength);
export const Min = mixable(_Min);
export const Max = mixable(_Max);
export const Type = mixable(_Type);
