import { Table } from "antd";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { GetOwnerships, updateOwnershipState } from "../../../redux/actions";
import ModalPendingModify from "./ModalPendingModify";

export default function UserPendingList() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("UserLogin"));
  const ownerships = useSelector((state) => state.ownershipsFiltered);
  const [modifyVisible, setModifyVisible] = useState(false);
  const [ownershipToModify, setOwnershipToModify] = useState(null);
  const ownershipsFixed = ownerships?.map((o) => {
    if (o.garage === true) {
      o.garage = "Tiene";
    } else {
      o.garage = "No tiene";
    }
    o.price = "$" + parseInt(o.price).toLocaleString();
    return o;
  });
  const [newValue, setNewValue] = useState({
    ownershipId: null,
    stateValue: null,
  });
  const columnsOwnerships = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ciudad",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Direccion",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Cant habitaciones",
      dataIndex: "rooms",
      key: "rooms",
    },
    {
      title: "Garage",
      dataIndex: "garage",
      key: "garage",
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Estado de la publicacion",
      dataIndex: "published",
      key: "published",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (record) => {
        return (
          <>
            <FaEdit
              color="lightgreen"
              onClick={() => {
                setModifyVisible(true);
                setOwnershipToModify(record);
                setNewValue({
                  ownershipId: record.id,
                  stateValue: "En Revision",
                });
              }}
              style={{ cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(
      GetOwnerships("published=Revision Pendiente/En revision/Cancelada")
    );
  }, [dispatch]);

  function handleNewValue(id, selectValue) {
    const value = { ownershipId: id, stateValue: selectValue };
    setNewValue(value);
  }
  if (user.role <= 2) {
    return <Navigate to="/user/:name/info" />;
  }
  return (
    <div>
      {modifyVisible && (
        <ModalPendingModify
          open={modifyVisible}
          ownership={ownershipToModify}
          onCancel={() => {
            setOwnershipToModify(null);
            setModifyVisible(false);
          }}
          onOk={() => {
            setModifyVisible(false);
            dispatch(updateOwnershipState(newValue));
          }}
          setNewValue={handleNewValue}
        />
      )}

      <Table dataSource={ownerships} columns={columnsOwnerships} size="large" />
    </div>
  );
}
