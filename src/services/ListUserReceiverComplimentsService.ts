import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"



class ListUserReceiverComplimentsService {

    async execute(user_id: string) {
        const complimentsRepositores = getCustomRepository(ComplimentsRepositories)

        const compliments = await complimentsRepositores.find({
            where: {
                user_receiver: user_id
            },
            relations: ["useSender", "userReceiver", "tag"]
        })

        return compliments
    }


}

export { ListUserReceiverComplimentsService }