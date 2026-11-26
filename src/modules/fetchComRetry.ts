const fetchOriginal: typeof fetch = globalThis.fetch;

globalThis.fetch = (async (
  input: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1],
) => {
  try {
    return await fetchOriginal(input, init);
  } catch (erro) {
    if ((erro as { cause?: { code?: string } })?.cause?.code === "UND_ERR_SOCKET") {
      return fetchOriginal(input, init);
    }
    throw erro;
  }
}) as typeof fetch;
