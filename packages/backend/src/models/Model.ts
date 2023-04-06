import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { v4 } from 'uuid'
import { firestore } from '../lib/firestore'
import pluralize from 'pluralize'

export default class Model<DataType extends object> {
  public readonly id: string
  public data: DataType
  private liveData: DataType

  public constructor(initialData: DataType, id?: string) {
    this.data = initialData
    this.liveData = {} as DataType
    this.id = id || v4()
  }

  public static async findById<
    ModelClass extends Model<DataType>,
    DataType extends object
  >(id: string): Promise<ModelClass> {

    const collectionName = pluralize(this.name)
    const documentRef = doc(firestore, collectionName, id)
    const document = await getDoc(documentRef)
    const instance = new this(document.data() as DataType, document.id)
    instance.liveData = {...instance.data}
    return instance as ModelClass
  }

  public static async findByField<
    ModelClass extends Model<DataType>,
    DataType extends object
  >(
    field: keyof DataType,
    value: DataType[keyof DataType]
  ): Promise<ModelClass[]> {
    const collectionName = pluralize(this.name)
    const collectionRef = collection(firestore, collectionName)

    const q = query(collectionRef, where(field as string, '==', value))
    const data = await getDocs(q)
    const result: ModelClass[] = []
    data.forEach(document => {
      const instance = new this(document.data() as DataType, document.id) as ModelClass
      instance.liveData = {...instance.data}
      result.push(instance)
    })

    return result
  }

  public async save(): Promise<void> {
    if (this.isDirty()) {
      const docRef = doc(firestore, pluralize(this.constructor.name), this.id)
      await setDoc(docRef, this.data)
      this.liveData = { ...this.data }
    }
  }

  public isDirty(): boolean {
    let dirty = false
    Object.keys(this.data).every((fieldName) => {
      if (this.data[fieldName as keyof DataType] !== this.liveData[fieldName as keyof DataType]) {
        dirty = true
        return false
      }
      return true
    })
    return dirty
  }
}