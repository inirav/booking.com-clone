import Button from '../../components/Button'
import Form from '../../components/Form'
import Modal from '../../components/Modal'
import * as Yup from 'yup'
import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Table from '../../components/Table'
import toast from 'react-hot-toast'
import { BiTrash } from 'react-icons/bi'
import TableActionCell from '../../components/TableActionCell'
import { FieldArray } from 'formik'
import { FieldGroup, FormAction, FormElement } from '../../components/Form/styles'
import Field from '../../components/Form/Field'
import { RoomFieldSet, RoomFieldSetContaier, RoomFieldSetTitle } from './styles'
import PropertyTypes from '../../constants/propertyTypes'
import {
  createProperty,
  deleteProperty,
  getProperties,
  getPropertyById,
  updateProperty,
} from '../../services/properties'
import { createRoom, getRooms, updateRoom } from '../../services/rooms'

const ROOM_INITIAL_STATE = {
  id: '',
  name: '',
  desc: '',
  price: undefined as undefined | number,
  roomNumbers: '',
}

const INITIAL_STATE = {
  name: '',
  type: 'resort',
  city: '',
  address: '',
  desc: '',
  cheapestPrice: undefined as undefined | number,
  distance: undefined as undefined | number,
  highlights: '',
  freeAirportTaxi: true,
  freeCancellation: true,
  featured: false,
  images: [] as string[],
  rooms: [ROOM_INITIAL_STATE],
}

type Props = {}

const Properties = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [updateId, setUpdateId] = useState('')
  const [initialState, setInitialState] = useState(INITIAL_STATE)

  const isUpdateMode = () => updateId !== ''

  const { data: properties, isSuccess, refetch } = useQuery(['properties'], getProperties)

  const columns = useMemo(
    () => [
      { Header: '#', accessor: 'serial', Cell: (data: any) => data.row.index + 1 },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'City', accessor: 'city' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'Cheapest Price', accessor: 'cheapestPrice' },
      { Header: 'Action', accessor: 'action' },
    ],
    []
  )

  const handleActions = useCallback(
    async (id: string, type: 'DELETE' | 'UPDATE') => {
      switch (type) {
        case 'DELETE':
          if (!window.confirm('Are you sure?')) return
          await deleteProperty(id)
          refetch()
          toast.success('Property is deleted successfully')

          break
        case 'UPDATE':
          const property = await getPropertyById(id)
          const rooms = await getRooms(property._id)

          setInitialState({
            name: property.name,
            type: property.type,
            city: property.city,
            address: property.address,
            desc: property.desc,
            cheapestPrice: property.cheapestPrice,
            distance: property.distance,
            highlights: property.highlights,
            freeAirportTaxi: property.freeAirportTaxi,
            freeCancellation: property.freeCancellation,
            featured: property.featured,
            images: property.images,
            rooms: rooms.map((room) => ({
              id: room._id,
              name: room.name,
              desc: room.desc,
              price: room.price,
              roomNumbers: room.roomNumbers.map((roomNumber) => roomNumber.number).join(','),
            })),
          })
          setUpdateId(id)
          setIsOpenModal(true)

          break
      }
    },
    [refetch]
  )

  const data = useMemo(
    () =>
      properties?.map((property) => {
        return {
          id: property._id,
          name: property.name,
          type: property.type,
          city: property.city,
          address: property.address,
          cheapestPrice: property.cheapestPrice,
          action: (
            <TableActionCell>
              <BiTrash
                color="red"
                onClick={(e) => {
                  e.stopPropagation()
                  handleActions(property._id, 'DELETE')
                }}
              />
            </TableActionCell>
          ),
        }
      }),
    [properties, handleActions]
  )

  return (
    <>
      <Button
        primary
        large
        onClick={() => {
          setInitialState(INITIAL_STATE)
          setUpdateId('')
          setIsOpenModal(true)
        }}
      >
        Add
      </Button>

      {isSuccess && (
        <Table columns={columns} data={data} onRowClick={(id) => handleActions(id, 'UPDATE')} />
      )}

      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        title={isUpdateMode() ? initialState.name : 'Add Property'}
      >
        <Form
          initialValues={initialState}
          validationSchema={Yup.object({
            name: Yup.string().required('This field is required'),
            type: Yup.string().required('This field is required'),
            city: Yup.string().required('This field is required'),
            address: Yup.string().required('This field is required'),
            desc: Yup.string().required('This field is required'),
            highlights: Yup.string().required('This field is required'),
            cheapestPrice: Yup.number().required('This field is required'),
            distance: Yup.number().required('This field is required'),
            images: Yup.array().min(1, 'Upload at list one photo'),
            rooms: Yup.array()
              .of(
                Yup.object().shape({
                  name: Yup.string().required('This field is required'),
                  desc: Yup.string().required('This field is required'),
                  price: Yup.number().required('This field is required'),
                  roomNumbers: Yup.string().required('This field is required'),
                })
              )
              .min(1, 'Add at least one room type'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const { rooms, ...propertyPayload } = values
            const roomsPayload = rooms.map((room) => ({
              ...room,
              roomNumbers: room.roomNumbers.split(','),
            }))

            if (isUpdateMode()) {
              await updateProperty(updateId, propertyPayload)

              await Promise.all(
                roomsPayload.map((roomPayload) => {
                  const { id, ...payload } = roomPayload
                  return id === ''
                    ? createRoom(updateId, payload)
                    : updateRoom(updateId, id, payload)
                })
              )

              toast.success('Property updated successfully')
            } else {
              const property = await createProperty(propertyPayload)
              await Promise.all(
                roomsPayload.map((roomPayload) => {
                  const { id, ...payload } = roomPayload
                  return createRoom(property._id, payload)
                })
              )

              toast.success('Property added successfully')
            }
            setSubmitting(false)
            setIsOpenModal(false)
            refetch()
          }}
        >
          {({ isSubmitting, values, errors }) => (
            <FormElement>
              <Field.Input name="name" label="Name" />
              <FieldGroup>
                <Field.Select
                  name="type"
                  label="Type"
                  options={Object.keys(PropertyTypes).map((item) => ({
                    value: item.toLowerCase(),
                    label: item,
                  }))}
                />
                <Field.Input name="city" label="City" />
              </FieldGroup>
              <Field.Textarea name="address" label="Address" />
              <Field.TextEditor name="desc" label="Description" />
              <Field.TextEditor name="highlights" label="Highlights" />
              <FieldGroup>
                <Field.Input type="number" name="cheapestPrice" label="Cheapest Price" />
                <Field.Input type="number" name="distance" label="Distance from Center (m)" />
              </FieldGroup>
              <FieldGroup>
                <Field.Input type="checkbox" name="freeAirportTaxi" label="Free Airport Taxi" />
                <Field.Input type="checkbox" name="freeCancellation" label="Free Cancellation" />
                <Field.Input type="checkbox" name="featured" label="Featured" />
              </FieldGroup>
              <Field.ImageUploadWidget name="images" label="Images" />

              <RoomFieldSetTitle>Room Types</RoomFieldSetTitle>

              <FieldArray name="rooms">
                {(arrayHelpers) => (
                  <RoomFieldSetContaier>
                    {values.rooms.map((room, index) => (
                      <RoomFieldSet key={index}>
                        <Field.Input name={`rooms.${index}.name`} label="Name" />
                        <Field.TextEditor name={`rooms.${index}.desc`} label="Description" />
                        <FieldGroup>
                          <Field.Input type="number" name={`rooms.${index}.price`} label="Price" />
                          <Field.Input name={`rooms.${index}.roomNumbers`} label="Room Numbers" />
                        </FieldGroup>

                        <Button
                          style={{ float: 'right' }}
                          onClick={() => values.rooms.length > 1 && arrayHelpers.remove(index)}
                        >
                          -
                        </Button>
                      </RoomFieldSet>
                    ))}
                    <Button primary onClick={() => arrayHelpers.push(ROOM_INITIAL_STATE)}>
                      + Add Room
                    </Button>
                  </RoomFieldSetContaier>
                )}
              </FieldArray>

              <FormAction>
                <Button onClick={() => setIsOpenModal(false)}>Cancel</Button>
                <Button primary type="submit" isProcessing={isSubmitting}>
                  Save
                </Button>
              </FormAction>
            </FormElement>
          )}
        </Form>
      </Modal>
    </>
  )
}

export default Properties
