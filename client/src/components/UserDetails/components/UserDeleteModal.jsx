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
      <p>Esta seguro que desea eliminar el usuario {user.name}?</p>
    </Modal>
  );
}
