import { Modal } from "antd";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
export const columnsOwnerships = [
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
    title: "Pisos",
    dataIndex: "floors",
    key: "floors",
  },
];

export const columnsUsers = [
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
          <FaEdit />
          <FaTrash color="red" onClick={() => deleteVisible(true)} />
        </>
      );
    },
  },
];

export const columnSales = [
  {
    title: "Estado",
    dataIndex: "state",
    key: "name"
  },
  {
    title: "Detalle del estado",
    dataIndex: "state_detail",
    key:"state_detail"
  }
]
