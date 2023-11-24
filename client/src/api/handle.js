
export async function query(data) {
	try {
	  const response = await fetch(
		"https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
		{
		  headers: { 
			"Accept": "image/png",
			"Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
			"Content-Type": "application/json" 
		  },
		  method: "POST",
		  body: JSON.stringify(data),
		}
	  );
  
	  if (!response.ok) {
		throw new Error(`API responded with status: ${response.status}`);
	  }
  
	  const result = await response.blob();
	  return result;
	} catch (error) {
	  console.error("API query failed", error);
	  throw error; // Re-throw the error if you want to handle it further up the call stack
	}
  }