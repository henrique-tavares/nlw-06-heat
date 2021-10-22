defmodule NlwHeatTags.Tags.Count do
  alias NlwHeatTags.Messages.Get

  def call do
    Get.today_messages()
    |> Task.async_stream(fn message ->
      message.message
      |> String.split()
      |> Enum.frequencies()
    end)
    |> Enum.reduce(%{}, fn {:ok, elem}, acc ->
      Map.merge(elem, acc, fn _key, value1, value2 ->
        value1 + value2
      end)
    end)
  end
end
