import React from "react";
import { Modal } from "antd";

export default function ModalPendingModify({
  open,
  onCancel,
  onOk,
  ownership,
  setNewValue,
}) {
  const ownershipStates = [
    "Revision Pendiente",
    "En revision",
    "Publicada",
    "Cancelada",
  ];
  const ownershipStatesLeft = ownershipStates.filter((o) => {
    return ownership.published !== o;
  });
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
        name={ownership.id}
        onChange={(e) => setNewValue(ownership.id, e.target.value)}
        style={{ marginLeft: "15px" }}
      >
        {ownership &&
          ownershipStatesLeft.map((e) => {
            console.log(e);
            return <option value={e}>{e}</option>;
          })}
      </select>
    </Modal>
  );
}
