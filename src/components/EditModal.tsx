import { Box, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Todo } from "../types/Todo";
import ReactModal from 'react-modal';

interface EditTodoProps {
    isEdit: boolean;
    onClose: () => void;
    todo: Todo | null;
    onSave: (editedTodo: Todo) => void;
}


export const EditModal: React.FC<EditTodoProps> = 
    ({ isEdit, onClose, todo, onSave}) => {
    //TODO型をつける
    const [editedTodo, setEditedTodo] = useState<any>(todo)
    console.log(editedTodo);
    

    const handleSave = () => {
       if (editedTodo) {
            onSave(editedTodo);
            //編集が完了したらモーダルを閉じるようにしたい
            onClose();
        }
    };


    return (
        <ReactModal isOpen={isEdit} onRequestClose={onClose}>
            <h2>Todoの編集</h2>
            {editedTodo && (
                <>
                    <input
                        type="text"
                        value={editedTodo.title}
                        onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
                    />
                    <button onClick={handleSave}>保存</button>
                    <button onClick={onClose}>キャンセル</button>
                </>
            )}
        </ReactModal>
    );
};