defmodule NlwHeatTags.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      NlwHeatTags.Repo,
      # Start the Telemetry supervisor
      NlwHeatTagsWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: NlwHeatTags.PubSub},
      # Start the Endpoint (http/https)
      NlwHeatTagsWeb.Endpoint,
      # Start a worker by calling: NlwHeatTags.Worker.start_link(arg)
      # {NlwHeatTags.Worker, arg}
      NlwHeatTags.Scheduler
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: NlwHeatTags.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    NlwHeatTagsWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
