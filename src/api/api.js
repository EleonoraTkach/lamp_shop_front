export const request = async (
    url,
    method = "GET",
    data = null
) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    let result = null;

    try {
        result = await response.json();
    } catch {
        result = null;
    }

    if (!response.ok) {
        let message = "Server error";

        if (typeof result?.detail === "string") {
            message = result.detail;
        }

        else if (Array.isArray(result?.detail)) {
            message = result.detail
                .map((e) => e.msg)
                .join(", ");
        }

        else if (result?.detail) {
            message = JSON.stringify(result.detail);
        }

        throw new Error(message);
    }

    return result;
};