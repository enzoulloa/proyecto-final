import React from "react";
import { Modal } from "antd";

export default function ModalPendingModify({
  open,
  onCancel,
  onOk,
  ownership,
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
      <p>Que modificacion desea aplicarle a {ownership.name}?</p>
      <label>Estado:</label>
      <select
        name="role"
        onChange={(value) => setType(value)}
        style={{ marginLeft: "15px" }}
      >
        <option value="En Revision">En Revision</option>
        <option value="Publicada">Publicada</option>
        <option value="Cancelada">Cancelada</option>
      </select>
    </Modal>
  );
}
