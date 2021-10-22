defmodule NlwHeatTagsWeb.TagsController do
  use NlwHeatTagsWeb, :controller

  alias NlwHeatTags.Tags.Count

  def get(conn, _params) do
    Count.call()
    |> handle_get(conn)
  end

  defp handle_get(data, conn) do
    conn
    |> put_status(:ok)
    |> render("ok.json", words_map: data)
  end
end
