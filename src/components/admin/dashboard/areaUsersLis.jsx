async function getUsers() {
  const res = await fetch('http://localhost:3001/api/users');
  console.log('Status response:', res.status);
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Erreur API:', errorText);
    throw new Error("Erreur lors de la récupération des utilisateurs");
  }
  return res.json();
}


export default async function AreaUsersList() {
  const users = await getUsers();

  return (
    <div className="card">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    width="40"
                    height="40"
                    style={{ borderRadius: "50%" }}
                    alt={`${user.name}'s Avatar`}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="badge bg-pink-500 text-white">{user.role}</span>
                  ) : (
                    <span className="badge bg-green-500 text-white">{user.role}</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Aucun utilisateur trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
