import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import Button from "@/components/Button"
import { useState } from "react"
import Modal from "@/components/Modal"
import UpdatePartnerNameForm from "@/features/user/forms/updatePartnerNameForm"

export default function UpdatePartnerNameBtn() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        disabled={false}
        classNames={{ wrapper: "justify-between" }}
        iconPosition="right"
        type="white"
        onPress={() => setIsOpen(true)}
        title="Change partner's name"
      >
        <FontAwesome6 name="face-kiss-beam" size={24} color="black" />
      </Button>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <UpdatePartnerNameForm onCancel={() => setIsOpen(false)} />
      </Modal>
    </>
  )
}
