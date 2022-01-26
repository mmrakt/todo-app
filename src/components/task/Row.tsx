import { DeleteIcon } from '@chakra-ui/icons'
import { ListItem, Input, Stack } from '@chakra-ui/react'
import React from 'react'
import { useMutate } from '../../hooks/useMutate'
import Button from '../Button'

type IProps = {
  id: number
  content: string
  done: boolean
}

function Row({ id, content, done }: IProps): any {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editingContent, setEditingContent] = React.useState(content)

  const handleToggleInput = () => {
    setIsEditing(isEditing ? false : true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditingContent(e.target.value)
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      editingContent !== '' &&
      !(e.nativeEvent as any).isComposing
    ) {
      updateContent()
    }
  }
  const handleClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    if (editingContent !== '' && !(e.nativeEvent as any).isComposing) {
      updateContent()
    }
  }

  const updateContent = () => {
    updateContentMutate()
    setEditingContent(editingContent)
    setIsEditing(false)
  }

  const { mutate: updateStatusMutate } = useMutate({
    path: `api/tasks/${id}`,
    method: 'PATCH',
    body: JSON.stringify({
      done: !done,
    }),
    key: 'tasks',
  })

  const { mutate: updateContentMutate } = useMutate({
    path: `api/tasks/${id}`,
    method: 'PATCH',
    body: JSON.stringify({
      content: editingContent,
    }),
    key: 'tasks',
  })

  const { mutate: deleteUncompletedMutate } = useMutate({
    path: `api/tasks/${id}`,
    method: 'DELETE',
    key: 'tasks',
  })

  const { mutate: deleteCompletedMutate } = useMutate({
    path: `api/tasks/${id}`,
    method: 'DELETE',
    key: 'completedTasks',
  })

  return (
    <>
      <ListItem>
        <div className="flex items-center my-3">
          {isEditing ? (
            <>
              <Stack className="w-full">
                <Input
                  placeholder="Change TODO"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  value={editingContent}
                />
                <div className="float">
                  <Button
                    text="保存"
                    onClickEvent={handleClick}
                    className="border-2 border-blue-500"
                  />
                  <Button
                    text="キャンセル"
                    onClickEvent={handleToggleInput}
                    className="bg-dark-black hover:bg-dark-lightGray border-2 border-dark-lightGray ml-5"
                  />
                </div>
              </Stack>
            </>
          ) : (
            <>
              {done ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      updateStatusMutate()
                    }}
                  >
                    <div className="rounded-[50%] bg-neutral-600 border-neutral-300 border-[1px] border-solid">
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="stroke-slate-300 stroke-1"
                          d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"
                        />
                      </svg>
                    </div>
                  </button>
                  <div
                    className="ml-3 text-xl w-full"
                    onClick={() => {
                      handleToggleInput()
                    }}
                  >
                    <span className="line-through text-neutral-500">
                      {content}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      updateStatusMutate()
                    }}
                  >
                    <div className="rounded-[50%] bg-dark-black border-neutral-300 border-[1px] border-solid">
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z" />
                      </svg>
                    </div>
                  </button>
                  <div
                    className="ml-3 text-xl w-full"
                    onClick={() => {
                      handleToggleInput()
                    }}
                  >
                    {content}
                  </div>
                </>
              )}
              <button
                type="button"
                className="hover:bg-neutral-600"
                onClick={() => {
                  done ? deleteCompletedMutate() : deleteUncompletedMutate()
                }}
              >
                <DeleteIcon className="p-1" boxSize={6} />
              </button>
            </>
          )}
        </div>
      </ListItem>
      <hr className="bg-slate-200" />
    </>
  )
}

export default Row