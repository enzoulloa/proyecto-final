import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { banUser, GetUsers, updateRole } from "../../../redux/actions";
import { Table } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import UserDeleteModal from "./UserDeleteModal";
import UserUpdateModal from "./UserUpdateModal";
import { Navigate } from "react-router-dom";

export default function UserModerate() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = JSON.parse(window.localStorage.getItem("UserLogin"));
  const newUsers = users.map((u) => {
    if (u.role === 1) {
      u.role = "Usuario";
    }
    if (u.role === 2) {
      u.role = "Vendedor";
    }
    if (u.role === 3) {
      u.role = "Administrador";
    }
    return u;
  });
  const [modalDelete, setModalDelete] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [userToModify, setUserToModify] = useState(null);
  const [userType, setUserType] = useState(1);

  const columnsUsers = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Numero de Celular",
      dataIndex: "cel",
      key: "cel",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (record) => {
        return (
          <>
            <FaEdit
              key={record.id}
              style={{ marginLeft: "5px", cursor: "pointer" }}
              onClick={() => {
                setUserToModify(record);
                setModalUpdate(true);
              }}
            />
            <FaTrash
              color="red"
              onClick={() => {
                setUserToModify(record);
                setModalDelete(true);
              }}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

  function handleType(e) {
    setUserType(e.target.value);
  }

  function applyModeration(userId) {
    dispatch(banUser(userId));
  }

  function applyNewRole(userId) {
    dispatch(updateRole({ userId, userType }));
    setUserType(1);
  }
  if (user.role !== 3) {
    return <Navigate to={`/usuario/${user.name}/informacion`} />;
  }
  return (
    <>
      {modalDelete && (
        <UserDeleteModal
          open={modalDelete}
          onCancel={() => {
            setUserToModify(null);
            setModalDelete(false);
          }}
          onOk={() => {
            applyModeration(userToModify.id);
            setModalDelete(false);
            setUserToModify(null);
          }}
          user={userToModify}
        />
      )}
      {modalUpdate && (
        <UserUpdateModal
          open={modalUpdate}
          onCancel={() => {
            setUserToModify(null);
            setModalUpdate(false);
          }}
          onOk={() => {
            applyNewRole(userToModify.id);
            setModalUpdate(false);
            setUserToModify(null);
          }}
          setType={handleType}
          user={userToModify}
        />
      )}
      <div>
        <Table dataSource={newUsers} columns={columnsUsers} />
      </div>
    </>
  );
}
