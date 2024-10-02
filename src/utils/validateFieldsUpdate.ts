
export const validFieldsAllowsUpdate = async (fieldsAllows: string[], dataUpdate: Record<string, any>) => {

        const obj: Record<string, any> = {};
        for (const key in dataUpdate) {

            const element = dataUpdate[key]
            if (fieldsAllows.includes(key)) obj[key] = element
        }

        return obj

}