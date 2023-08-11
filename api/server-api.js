import mongoose from "mongoose"

class ServerApi {
  constructor(collection, Model) {
    this.collection = collection
    this.Model = Model
  }
  async getAll(sortBy = null) {
    return await this.Model(this.collection).find().sort(`-${sortBy}`)
  }

  async post(obj) {
    const postedData = await this.Model(this.collection)({
      ...obj,
      _id: new mongoose.Types.ObjectId(),
    })

    return await postedData.save()
  }
  async delete(id) {
    return await this.Model(this.collection).findByIdAndRemove(id)
  }

  async update(id, value) {
    return await this.Model(this.collection).findByIdAndUpdate(
      id,
      {
        $set: {
          typeTags: [value],
        },
      },
      {
        new: true,
      }
    )
  }

  async getUnique(id) {
    return await this.Model(this.collection).findById(id)
  }
  async getOne(props) {
    return await this.Model(this.collection).findOne(props)
  }
}

export const ApiServer = (collectionName, ModelSchema) =>
  new ServerApi(collectionName, ModelSchema)
