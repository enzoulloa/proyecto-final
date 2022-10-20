export default function UserDashboard({ name, mail, cel }) {
  return (
    <div className="Dashboard">
      <p>Name: {`${name}`}</p>
      <p>Email: {`${mail}`}</p>
      <p>Cel: {`${cel}`}</p>
    </div>
  );
}
