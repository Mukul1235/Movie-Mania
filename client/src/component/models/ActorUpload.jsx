import React, { useState } from "react";
import ModalsContainer from "./ModalContainer";
import ActorForm from "../form/ActorForm";
import { createActor } from "../../api/actor";
import { useNotification } from "../../hooks";

function ActorUpload({ visible, onClose }) {
    const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
        setBusy(true);

    const { error, actor } = await createActor(data);
        setBusy(false);

    if (error) return updateNotification("error", error);
    updateNotification('success','Actor created successfully.')
    onClose();

  };
  return (
    <ModalsContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        onSubmit={!busy ? handleSubmit : null}
        title="Create New Actor"
        btnTitle="Create"
        busy={busy}
      />
    </ModalsContainer>
  );
}

export default ActorUpload;