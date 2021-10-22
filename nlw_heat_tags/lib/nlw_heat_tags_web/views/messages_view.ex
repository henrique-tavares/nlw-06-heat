defmodule NlwHeatTagsWeb.MessagesView do
  use NlwHeatTagsWeb, :view

  def render("create.json", %{message: message}) do
    %{
      result: "Message created!",
      message: message
    }
  end
end
