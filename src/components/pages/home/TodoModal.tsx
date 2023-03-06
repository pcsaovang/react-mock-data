import { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalId } from "../../../constants/modal";
import { httpClient } from "../../../httpClient";
import { Modal, useModal } from "../../modal";

type Todo = {
  id: number;
  userId: number;
  title: string;
};

export const TodoModal: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [todo, setTodo] = useState<Todo[]>([]);
  const { show } = useModal();

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const response = await httpClient.get<{}, Todo[], {}>("/todos");
      setTodo(response);
    } catch (error) {
      // noop
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (show === ModalId.TODO_LIST_MODAL) {
      load();
    }
  }, [load, show]);

  return (
    <Modal title="Todo list" modalId="todoListModal" contentLoading={loading}>
      {todo.map((item) => {
        return (
          <TodoItem key={item.id}>
            <Checkbox type="checkbox" />
            <span>{item.title}</span>
          </TodoItem>
        );
      })}
    </Modal>
  );
};
TodoModal.displayName = "TodoModal";

const TodoItem = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  text-transform: capitalize;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 16px;
  height: 16px;
`;
