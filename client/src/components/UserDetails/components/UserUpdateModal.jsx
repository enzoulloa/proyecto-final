import React from "react";
import { Modal, Select } from "antd";

export default function UserUpdateModal({
  open,
  onCancel,
  onOk,
  user,
  setType,
}) {
  return (
    <Modal
      onCancel={onCancel}
      open={open}
      title={"Modificar info"}
      onOk={onOk}
      okText="Aplicar"
      cancelText="Cancelar"
    >
      <p>Que modificacion desea aplicarle a {user.name}?</p>
      <label>Nuevo rol:</label>
      <select
        name="role"
        onChange={(value) => setType(value)}
        style={{ marginLeft: "15px" }}
      >
        <option value={1}>Usuario</option>
        <option value={2}>Vendedor</option>
        <option value={3}>Administrador</option>
      </select>
    </Modal>
  );
}
