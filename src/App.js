// ІМПОРТУЄМО БІБЛІОТЕКИ БЕЗ ЯКИХ НЕ МОЖЕМО ПИСАТИ КОД
import React from "react";
import styled from "styled-components";
// ІМПОРТУЄМО ПОТРІБНІ КОМПОНЕНТИ
import Page from "./component/Page";
import Header from "./component/Header";
import Balance from "./component/Balance";
import Menu from "./component/Menu";
import Payment from "./component/Payment";

// КОНФІГУРАЦІЯ ========================================

const START_BALANCE = 10000;
const LIMIT_BALANCE = 100000;
const GET_MONEY = 100;
const SALARY_AMOUNT = 1000;
const COURSE_PRICE = 850;

export default function App() {
  const [balance, setBalance] = React.useState(START_BALANCE);

  // Функція для прямого поповнення балансу
  const getMoney = () => {
    setBalance(balance + GET_MONEY);
    setPayment([
      {
        name: "Поповнення гаманця",
        amount: GET_MONEY,
        type: "+"
      },
      ...payment
    ]);
  };

  // Функція яка виконується кожен раз коли наш баланс змінився
  React.useEffect(() => {
    // Перевірка на ліміт балансу
    if (balance > LIMIT_BALANCE) {
      alert(`Ваш ліміт балансу: ${LIMIT_BALANCE}`);
      setBalance(START_BALANCE);
    }

    // Перевірка на мінусовий баланс
    if (balance < 0) {
      alert(`Ви використали усі свої гроші. Поповніть картку`);
      // setBalance(0);
    }
    // Сюди записуються змінні при оновленні яких буде виконуватися функція
  }, [balance]);

  // ФУНКЦІОНАЛ Транзакцій ========================
  const [payment, setPayment] = React.useState([]);

  const getSalary = () => {
    setBalance(balance + SALARY_AMOUNT);

    setPayment([
      {
        name: "Зарплата",
        amount: SALARY_AMOUNT,
        type: "+"
      },
      ...payment
    ]);
  };

  const buyCourse = () => {
    setBalance(balance - COURSE_PRICE);

    setPayment([
      {
        name: "Оплата курсу",
        amount: COURSE_PRICE,
        type: "-"
      },
      ...payment
    ]);
  };

  // Ось тут тримаємо актуальне значення балансу

  // ВЕРСТКА ІНТЕРФЕЙСУ ==========================================

  // ця функція відкриває вікно в браузері з текстом
  const LOGIN = "user";
  const PASWORD = "12345678";

  const [isLogged, setLogged] = React.useState(false);

  const doLogin = () => {
    const login = prompt("Your username");
    const password = prompt("Your passsword");

    if (login === LOGIN && password === PASWORD) {
      alert("You're welcome!");
      setLogged(true);
    } else {
      if (login !== LOGIN && password !== PASWORD) {
        return alert("Wrong password");
      }
      if (login !== LOGIN) {
        return alert("Wrong username");
      }
      if (password !== PASWORD) {
        return alert("Wrong password!");
      }
    }
  };

  return (
    <Page>
      {/* компонент шапки з нашою назвою
          також при кліку мишкою на шапку
          в нас визивається функція HelloWorld
      */}

      <Header name="My BANK-App" onClick={doLogin} />

      {/* Компонент баланса в який передається
          Актуальне значення балансу  */}
      {isLogged && <Balance balance={balance} />}

      {/* Компонент меню з кнопками */}
      {isLogged && (
        <Menu
          // ось сюди ми передаємо конфігурацію кнопок
          config={[
            {
              name: "Поповнити баланс",
              onClick: getMoney,
              img: "/icon/get.svg"
            },
            {
              name: "Отримати зарплату",
              onClick: getSalary,
              img: "/icon/apple.svg"
            },
            {
              name: "Купити курс",
              onClick: buyCourse,
              img: "/icon/payment.svg"
            }
          ]}
        />
      )}
      {/* компонент списка наших транзакцій
          цей функціонал ми будемо робити на 3 уроці
      */}
      {isLogged && <Payment payment={payment} />}

      {<NotLogged>You need to log in to the account</NotLogged>}
    </Page>
  );
}

const NotLogged = styled.div`
  padding: 100px 30px;
  background: #111;
  color: #fff;
  text-align: center;
`;
