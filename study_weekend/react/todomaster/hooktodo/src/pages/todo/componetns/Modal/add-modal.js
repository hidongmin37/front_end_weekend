import styled from "styled-components";
import {
    flexAlignCenter,
    flexCenter,
    modalBackGround,
} from "../../../../styles/common";

const TodoAddModal = ({onAddTodo, onClose})  => {

    return (
        <S.Wrapper>
            <S.Form onSubmit={onAddTodo}>
                <S.Title>
                    <span>ADD TODO LIST</span>
                    <button type="button" onClick={onClose}>x</button>
                </S.Title>
                <S.Content>
                    <input placeholder="제목을 입력해주세요" name="title"/>
                    <textarea placeholder="할 일 내용을 입력해주세요" name="content"></textarea>
                </S.Content>
                <S.Button>ADD</S.Button>
            </S.Form>
        </S.Wrapper>
    );
};
export default TodoAddModal;

const Wrapper = styled.div`
    ${modalBackGround};
    z-index: 1000;
`;

const Form = styled.form`
    width: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.PALETTE.white};
    border-radius: 8px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 32px;
`;

const Title = styled.div`
    font-size: 24px;
    ${flexAlignCenter};
    justify-content: space-between;

    & > button {
        border: none;
        cursor: pointer;

        :hover {
            transform: scale(1.2);
        }
    }
`;

const Content = styled.div`
    ${flexCenter};
    margin-top: 16px;
    flex-direction: column;

    & > input {
        width: 100%;
        height: 40px;
        border: none;
        outline: none;
        border-radius: 8px;
        padding: 0 16px;
        margin-bottom: 16px;
    }

    & > textarea {
        width: 100%;
        height: 200px;
        border: none;
        outline: none;
        border-radius: 8px;
        padding: 16px;
    }
`;

const Button = styled.button`
    display: block;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.PALETTE.primary[300]};
    color: ${({ theme }) => theme.PALETTE.fontColor};
    margin: 0 auto;
    cursor: pointer;
    :hover {
        background-color: transparent;
        color: ${({ theme }) => theme.PALETTE.primary[300]};
    }
`;

const S = {
    Wrapper,
    Form,
    Content,
    Title,
    Button,
};