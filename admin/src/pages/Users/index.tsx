import { useQuery } from '@tanstack/react-query'
import { useCallback, useContext, useMemo } from 'react'
import toast from 'react-hot-toast'
import { BiTrash } from 'react-icons/bi'
import Table from '../../components/Table'
import TableActionCell from '../../components/TableActionCell'
import { AuthContext } from '../../contexts/AuthContext'
import { getUsers } from '../../services/users'
import api from '../../utils/api'

type Props = {}

const Users = (props: Props) => {
  const { state } = useContext(AuthContext)
  const { user: currentUser } = state
  const { data: users, isSuccess, refetch } = useQuery(['users'], getUsers)

  const columns = useMemo(
    () => [
      { Header: 'Username', accessor: 'username' },
      { Header: 'Email', accessor: 'email' },
      {
        Header: 'Avatar',
        accessor: 'avatar',
        Cell: ({ row }: any) => <img src={row.original.avatar} alt="" height="30px" />,
      },
      { Header: 'Action', accessor: 'action' },
    ],
    []
  )

  const handleActions = useCallback(
    async (id: string, type: 'DELETE' | 'UPDATE') => {
      switch (type) {
        case 'DELETE':
          if (!window.confirm('Are you sure?')) return
          await api.delete(`/users/${id}`)
          refetch()
          toast.success('User deleted successfully')

          break
      }
    },
    [refetch]
  )

  const data = useMemo(
    () =>
      users?.map((user) => {
        return {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          action: (
            <TableActionCell>
              {user._id !== currentUser?._id && (
                <BiTrash
                  color="red"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleActions(user._id, 'DELETE')
                  }}
                />
              )}
            </TableActionCell>
          ),
        }
      }),
    [users, currentUser, handleActions]
  )

  return <>{isSuccess && <Table columns={columns} data={data} />}</>
}

export default Users
