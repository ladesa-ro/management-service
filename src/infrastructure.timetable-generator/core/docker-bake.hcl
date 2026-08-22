variable "SDK_IMAGEM" {
  default = "mcr.microsoft.com/dotnet/sdk@sha256:35048e3a81e6a07c316e7bbbd80d80d2ba705fe5f23a8ed42b6638c8f4c20d30"
}

group "default" {
  targets = ["test"]
}

target "base" {
  context    = "."
  dockerfile = "Containerfile"
  args = {
    SDK_IMAGEM = SDK_IMAGEM
  }
}

target "build" {
  inherits = ["base"]
  target   = "build"
  output   = ["type=cacheonly"]
}

target "test" {
  inherits = ["base"]
  target   = "test"
  output   = ["type=cacheonly"]
}

target "publicar" {
  inherits = ["base"]
  target   = "publicar"
  output   = ["type=cacheonly"]
}
