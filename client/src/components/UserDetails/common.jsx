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
          <FaEdit color="green" onClick={() => modifyVisible(true)} />
        </>
      );
    },
  },
];

export const columnSales = [
  {
    title: "Estado",
    dataIndex: "state",
    key: "name",
  },
  {
    title: "Detalle del estado",
    dataIndex: "state_detail",
    key: "state_detail",
  },
  {
    title: "Nombre de la propiedad",
    dataIndex: "Ownerships[0].name",
    key: "Ownerships[0].name",
  },
];
