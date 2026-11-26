const fetchOriginal: typeof fetch = globalThis.fetch;

globalThis.fetch = (async (
  input: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1],
) => {
  try {
    return await fetchOriginal(input, init);
  } catch (erro) {
    const codigo = (erro as { cause?: { code?: string } })?.cause?.code;
    if (codigo === "UND_ERR_SOCKET" || codigo === "ECONNRESET") {
      return fetchOriginal(input, init);
    }
    throw erro;
  }
}) as typeof fetch;
