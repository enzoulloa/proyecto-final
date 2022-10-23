export default function UserDashboard() {
  const user = JSON.parse(window.localStorage.getItem("UserLogin"));
  return (
    <div className="Dashboard">
      <p>Name: {`${user.name}`}</p>
      <p>Email: {`${user.email}`}</p>
      <p>Cel: {`156468798`}</p>
    </div>
  );
}
