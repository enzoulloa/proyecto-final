import React from "react";
import { Modal } from "antd";

export default function UserDeleteModal({ open, onCancel, onOk, user }) {
  return (
    <Modal
      onCancel={onCancel}
      open={open}
      title={"Eliminar usuario"}
      onOk={onOk}
    >
      <p>Modificar estado de {user.name}?</p>
      <p>
        El nuevo estado sera:{" "}
        {user.status === "Sin suspencion" ? "Suspendido" : "Sin suspencion"}
      </p>
    </Modal>
  );
}
