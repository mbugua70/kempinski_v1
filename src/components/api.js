import 'dotenv/config'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function loginUser(creds) {
  const res = await fetch(`${API_BASE_URL}/api/players/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify(creds),
  });
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.error,
    };
  }

  return data;
}

// getting all question

export async function getQuestions() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return;
  }
  const res = await fetch(`${API_BASE_URL}/api/questions`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (!res.ok) {
    throw {
      message: "Failed to fetch questions",
      // statusText: res.statusText,
      // status: res.status
    };
  }
  const data = await res.json();
  return data;
}

// getting colors

export async function getColors() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return;
  }
  const res = await fetch(`${API_BASE_URL}/api/colors`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (!res.ok) {
    throw {
      message: "Failed to fetch colors",
      // statusText: res.statusText,
      // status: res.status
    };
  }
  const data = await res.json();
  return data;
}

export async function updatePlayer(updateData) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return;
  }

  const id = user.userId;
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      throw new Error("Failed to update the player");
    }

    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    return error.message;
  }
}

export const fetchData = async () => {
  const [colors, questions] = await Promise.all([getColors(), getQuestions()]);
  return { colors, questions };
};