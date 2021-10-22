defmodule NlwHeatTagsWeb.TagsView do
  use NlwHeatTagsWeb, :view

  def render("ok.json", %{words_map: words_map}) do
    words_map
  end
end
