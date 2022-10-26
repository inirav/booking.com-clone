import Button from '../../components/Button'
import Form from '../../components/Form'
import Modal from '../../components/Modal'
import * as Yup from 'yup'
import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Table from '../../components/Table'
import HotelTypes from '../../constants/HotelTypes'
import api from '../../utils/api'
import Hotel from '../../types/Hotel'
import toast from 'react-hot-toast'
import { BiTrash } from 'react-icons/bi'
import TableActionCell from '../../components/TableActionCell'
import { FieldArray } from 'formik'
import { FieldGroup, FormAction, FormElement } from '../../components/Form/styles'
import Field from '../../components/Form/Field'
import { RoomFieldSet, RoomFieldSetContaier, RoomFieldSetTitle } from './styles'

const ROOM_INITIAL_STATE = { name: '', desc: '', maxPeople: 2, price: '', roomNumbers: '' }

const INITIAL_STATE = {
  name: '',
  type: 'resort',
  city: '',
  address: '',
  description: '',
  cheapestPrice: '',
  rating: '',
  reviews: '',
  distance: '',
  highlights: '',
  freeAirportTaxi: true,
  freeCancellation: true,
  featured: false,
  photos: [] as string[],
  rooms: [ROOM_INITIAL_STATE],
}

type Props = {}

const Hotels = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [updateId, setUpdateId] = useState('')
  const [initialState, setInitialState] = useState(INITIAL_STATE)

  const isUpdateMode = () => updateId !== ''

  const {
    data: hotels,
    isSuccess,
    refetch,
  } = useQuery(['hotels'], (): Promise<Hotel[]> => api.get('/hotels').then((res) => res.data))

  const columns = useMemo(
    () => [
      { Header: '#', accessor: 'serial', Cell: (data: any) => data.row.index + 1 },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'City', accessor: 'city' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'Cheapest Price', accessor: 'cheapestPrice' },
      { Header: 'Rating', accessor: 'rating' },
      { Header: 'Action', accessor: 'action' },
    ],
    []
  )

  const handleActions = useCallback(
    async (id: string, type: 'DELETE' | 'UPDATE') => {
      switch (type) {
        case 'DELETE':
          if (!window.confirm('Are you sure?')) return
          await api.delete(`/hotels/${id}`)
          refetch()
          toast.success('Hotel is deleted successfully')

          break
        case 'UPDATE':
          const res = await api.get(`/hotels/${id}`)
          const hotel: Hotel = res.data
          if (!hotel) return

          setInitialState({
            name: hotel.name,
            type: hotel.type,
            city: hotel.city,
            address: hotel.address,
            description: hotel.description,
            cheapestPrice: hotel.cheapestPrice.toString(),
            rating: hotel.rating.toString(),
            reviews: hotel.rating.toString(),
            distance: hotel.distance.toString(),
            highlights: hotel.highlights,
            freeAirportTaxi: hotel.freeAirportTaxi,
            freeCancellation: hotel.freeCancellation,
            featured: hotel.featured,
            photos: hotel.photos,
            rooms: hotel.rooms.map((room) => ({
              name: room.name,
              desc: room.desc,
              maxPeople: room.maxPeople,
              price: room.price.toString(),
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
      hotels?.map((hotel) => {
        return {
          id: hotel._id,
          name: hotel.name,
          type: hotel.type,
          city: hotel.city,
          address: hotel.address,
          cheapestPrice: hotel.cheapestPrice,
          rating: hotel.rating,
          action: (
            <TableActionCell>
              <BiTrash
                color="red"
                onClick={(e) => {
                  e.stopPropagation()
                  handleActions(hotel._id, 'DELETE')
                }}
              />
            </TableActionCell>
          ),
        }
      }),
    [hotels, handleActions]
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
        title={isUpdateMode() ? initialState.name : 'Add Hotel'}
      >
        <Form
          initialValues={initialState}
          validationSchema={Yup.object({
            name: Yup.string().required('This field is required'),
            type: Yup.string().required('This field is required'),
            city: Yup.string().required('This field is required'),
            address: Yup.string().required('This field is required'),
            description: Yup.string().required('This field is required'),
            highlights: Yup.string().required('This field is required'),
            cheapestPrice: Yup.number().required('This field is required'),
            rating: Yup.number()
              .required('This field is required')
              .min(0, 'Rating must be between 0 to 10')
              .max(10, 'Rating must be between 0 to 10'),
            reviews: Yup.number().required('This field is required'),
            distance: Yup.number().required('This field is required'),
            photos: Yup.array().min(1, 'Upload at list one photo'),
            rooms: Yup.array()
              .of(
                Yup.object().shape({
                  name: Yup.string().required('This field is required'),
                  desc: Yup.string().required('This field is required'),
                  maxPeople: Yup.number().required('This field is required'),
                  price: Yup.number().required('This field is required'),
                  roomNumbers: Yup.string().required('This field is required'),
                })
              )
              .min(1, 'Add at least one room type'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const payload: any = {
              ...values,
              rooms: values.rooms.map((room) => ({
                ...room,
                roomNumbers: room.roomNumbers.split(',').map((num) => +num),
              })),
            }

            if (isUpdateMode()) {
              await api.put(`/hotels/${updateId}`, payload)
              toast.success('Hotel updated successfully')
            } else {
              await api.post(`/hotels`, payload)
              toast.success('Hotel added successfully')
            }
            setSubmitting(false)
            // setIsOpenModal(false)
            refetch()
          }}
        >
          {({ isSubmitting, values }) => (
            <FormElement>
              <Field.Input name="name" label="Name" />
              <FieldGroup>
                <Field.Select name="type" label="Type" options={HotelTypes} />
                <Field.Input name="city" label="City" />
              </FieldGroup>
              <Field.Textarea name="address" label="Address" />
              <Field.TextEditor name="description" label="Description" />
              <Field.TextEditor name="highlights" label="Highlights" />
              <FieldGroup>
                <Field.Input type="number" name="rating" label="Rating" />
                <Field.Input type="number" name="reviews" label="Review Count" />
              </FieldGroup>
              <FieldGroup>
                <Field.Input type="number" name="cheapestPrice" label="Cheapest Price" />
                <Field.Input type="number" name="distance" label="Distance from Center (m)" />
              </FieldGroup>
              <FieldGroup>
                <Field.Input type="checkbox" name="freeAirportTaxi" label="Free Airport Taxi" />
                <Field.Input type="checkbox" name="freeCancellation" label="Free Cancellation" />
                <Field.Input type="checkbox" name="featured" label="Featured" />
              </FieldGroup>
              <Field.ImageUploadWidget name="photos" label="Photos" />

              <RoomFieldSetTitle>Room Types</RoomFieldSetTitle>

              <FieldArray name="rooms">
                {(arrayHelpers) => (
                  <RoomFieldSetContaier>
                    {values.rooms.map((room, index) => (
                      <RoomFieldSet key={index}>
                        <Field.Input name={`rooms.${index}.name`} label="Name" />
                        <Field.TextEditor name={`rooms.${index}.desc`} label="Description" />
                        <FieldGroup>
                          <Field.Input
                            type="number"
                            name={`rooms.${index}.maxPeople`}
                            label="Max People"
                          />
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

export default Hotels
