defmodule NlwHeatTags.Repo do
  use Ecto.Repo,
    otp_app: :nlw_heat_tags,
    adapter: Ecto.Adapters.Postgres
end
