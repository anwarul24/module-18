/**
 * API Service for fetching student data
 * Integrates with public API (jsonplaceholder.typicode.com/users)
 * Includes simulated failure toggle for Task 5 & Bonus Challenge verification
 */

let simulateApiError = false;

export const setSimulateApiError = (value) => {
  simulateApiError = value;
};

export const getSimulateApiError = () => simulateApiError;

const DEPARTMENT_POOL = [
  "Computer Science",
  "Software Engineering",
  "Data Science",
  "Electrical Engineering",
  "Business Administration"
];

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80"
];

/**
 * Fetch students from public API using native fetch
 */
export async function fetchStudentsFromApi() {
  if (simulateApiError) {
    // Artificial latency before throwing simulated failure
    await new Promise((resolve) => setTimeout(resolve, 600));
    throw new Error(
      "Simulated Network Failure (HTTP 503: University API gateway temporarily unavailable). Test error handling & retry!"
    );
  }

  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`API error: Failed to fetch students (Status ${response.status})`);
  }

  const users = await response.json();

  // Map public API users to Student Management Model
  return users.map((user, index) => {
    const dept = DEPARTMENT_POOL[index % DEPARTMENT_POOL.length];
    const deptPrefix = dept.split(" ").map((w) => w[0]).join("");
    const gpa = Number((3.0 + (index * 0.11) % 1.0).toFixed(2));
    const status = gpa < 3.1 ? "Probation" : "Active";

    return {
      id: `API-${1000 + user.id}`,
      name: user.name,
      email: user.email.toLowerCase(),
      phone: user.phone,
      department: dept,
      rollNumber: `${deptPrefix}-2024-${String(user.id).padStart(3, "0")}`,
      gpa: Math.min(4.0, Math.max(2.0, gpa)),
      semester: `${((user.id * 2) % 8) + 1}th`,
      enrollmentYear: 2021 + (user.id % 3),
      status: status,
      attendance: 80 + (user.id * 2) % 20,
      avatar: AVATARS[index % AVATARS.length],
      bio: `Student at ${user.company.name}. Researching ${user.company.bs}.`,
      address: `${user.address.city}, ${user.address.street}`,
      advisor: `Dr. ${user.company.catchPhrase.split(" ")[0]} Smith`,
      completedCredits: 30 + user.id * 10,
      courses: ["Core Architecture", "Data Structures", "Database Engineering", "Web Technologies"]
    };
  });
}
