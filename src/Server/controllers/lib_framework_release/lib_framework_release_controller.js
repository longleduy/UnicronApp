//Todo: Model
import { libFrameModel } from '../../models/lib_framework_release_model'
import delay from 'delay'
export const getListLibFrame = async () => {
    const data = await libFrameModel.find();
    if (data.length > 0) {
        return data
    }
    throw new Error('Empty list')
}
