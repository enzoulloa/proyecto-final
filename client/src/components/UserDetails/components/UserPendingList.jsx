import { Table } from "antd";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetOwnerships } from "../../../redux/actions";
import { columnsOwnerships } from "../common";
import ModalPendingModify from "./ModalPendingModify";

export default function UserPendingList() {
  const dispatch = useDispatch();
  const ownerships = useSelector((state) => state.ownerships);
  const [modifyVisible, setModifyVisible] = useState(false);
  const [ownershipToModify, setOwnershipToModify] = useState(null);
  const ownershipsFixed = ownerships?.map((o) => {
    if (o.published === "Revision_Pendiente") {
      o.published = "Revision Pendiente";
    }
    if (o.garage === true) {
      o.garage = "Tiene";
    } else {
      o.garage = "No tiene";
    }
    o.price = "$" + parseInt(o.price).toLocaleString();
    return o;
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
              color="green"
              onClick={() => {
                setModifyVisible(true);
                setOwnershipToModify(record);
              }}
              style={{ cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(GetOwnerships(`published=Revision_Pendiente`));
  }, [dispatch]);
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
            console.log("lo cambie vieja");
          }}
        />
      )}

      <Table
        dataSource={ownershipsFixed}
        columns={columnsOwnerships}
        size="large"
      />
    </div>
  );
}
