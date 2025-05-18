import relax from "@/assets/illustrations/relax.png"
import addHabit from "@/assets/illustrations/add-habit.png"
import updateHabit from "@/assets/illustrations/update-habit.png"
import deleteHabit from "@/assets/illustrations/delete-habit.png"
import { PartnerRequestsOption } from "@/features/shared/partnerRequests/types/partnerRequests"
import { ImageSourcePropType } from "react-native"

export const modalDetails: Record<
  PartnerRequestsOption,
  {
    img: ImageSourcePropType
    title: string
    buttons: {
      onAccept: {
        label: string
        messageToPartner: string
      }
      onCancel: {
        label: string
        messageToPartner: string
      }
    }
  }
> = {
  takeDayOff: {
    img: relax,
    title: "Your partner wants to take a day off",
    buttons: {
      onAccept: {
        label: "Yea, let's chill",
        messageToPartner: "Your partner agreed to take a day off. Chill",
      },
      onCancel: {
        label: "Cancel",
        messageToPartner:
          "Your partner decided not to take a day off, keep working!",
      },
    },
  },
  updateHabit: {
    img: updateHabit,
    title: "Your partner wants to update a habit",
    buttons: {
      onAccept: {
        label: "Ok",
        messageToPartner: "Your partner agreed to update the habit",
      },
      onCancel: {
        label: "Cancel",
        messageToPartner: "Your partner decided not to update the habit",
      },
    },
  },
  deleteHabit: {
    img: deleteHabit,
    title: "Your partner wants to delete a habit",
    buttons: {
      onAccept: {
        label: "Ok",
        messageToPartner: "Your partner agreed to delete the habit",
      },
      onCancel: {
        label: "Cancel",
        messageToPartner: "Your partner decided not to delete the habit",
      },
    },
  },
  createHabit: {
    img: addHabit,
    title: "Your partner wants to create a habit",
    buttons: {
      onAccept: {
        label: "Ok",
        messageToPartner: "Your partner agreed to create the habit",
      },
      onCancel: {
        label: "Cancel",
        messageToPartner: "Your partner decided not to create the habit",
      },
    },
  },
}
