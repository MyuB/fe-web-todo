import { log } from "../components/log.js";
import { newCardWrapper, cardWrapper, newColumn } from "../components/card.js";
import {
  deleteNode,
  getTargetChild,
  addClsssName,
  getTargetParentByClassName,
  checkLogCount,
} from "../utils/utils.js";

const columnAddBtnClickEventHandler = (e) => {
  if (e.target.className === "column-add-btn") {
    const targetColumn = getTargetParentByClassName(e.target, "column-wrapper");
    addClsssName(e.target, "active");
    targetColumn.innerHTML += newCardWrapper({ id: "newCardInput" });
    const addBtn = document.querySelector(".column-add-btn");
    addBtn.classList.add("active");
  }
};

const cardAddBtnClickEventHandler = (e) => {
  if (e.target.className === "card-add-btn") {
    const newCardInfor = {
      tittle: null,
      text: null,
      columnID: null,
    };
    const targetColumn = getTargetParentByClassName(e.target, "column-wrapper");
    const newCardInputEl = document.querySelector("#newCardInput");
    const newInputData = [...newCardInputEl.children]
      .filter((v) => v.tagName === "INPUT")
      .map((v) => v.value);
    newCardInfor.tittle = newInputData[0];
    newCardInfor.text = newInputData[1];
    newCardInfor.columnID = e.currentTarget.id;

    document.querySelectorAll(".column-add-btn").forEach((v) => {
      if (v.classList.contains("active")) v.classList.remove("active");
    });
    targetColumn.innerHTML += cardWrapper(newCardInfor);
    deleteNode("#newCardInput");

    const cardWrapperNum = [...e.currentTarget.children].filter(
      (v) => v.className === "card-wrapper"
    ).length;
    getTargetChild(e.currentTarget, "column-header-num").textContent =
      cardWrapperNum;

    // add log
    const columnName = targetColumn.querySelector("h2");
    document.querySelector(".log-wrapper").innerHTML += log(
      columnName.innerHTML,
      newCardInfor.text,
      "add"
    );
    checkLogCount(targetColumn);
  }
};

const cardCancelBtnClickEventHandler = (e) => {
  if (e.target.className === "card-cancel-btn") {
    document.querySelectorAll(".column-add-btn").forEach((v) => {
      if (v.classList.contains("active")) v.classList.remove("active");
    });
    deleteNode("#newCardInput");
  }
};

const cardRemoveHoverEventHandler = (e) => {
  if (e.target.className === "card-remove-btn") {
    const cardNode = e.target.closest(".card-wrapper");
    cardNode.classList.add("mouse-on");
  }
};

const cardRemoveOutEvenetHandler = (e) => {
  if (e.target.className === "card-remove-btn") {
    const cardNode = e.target.closest(".card-wrapper");
    cardNode.classList.remove("mouse-on");
  }
};

const cardRemoveClickEventHandler = (e) => {
  if (e.target.className === "card-remove-btn") {
    const cardNode = e.target.closest(".card-wrapper");
    const modalWrapperEl = document.querySelector(".modal-wrapper");
    const bodyEl = document.body;

    cardNode.classList.add("focused");
    cardNode.classList.add("clicked");
    modalWrapperEl.classList.add("active");
    bodyEl.classList.add("modal-display");
  }
};

const addWholeColumnClickEventHandler = (e) => {
  const colNode = document.querySelector(".columns-wrapper");
  colNode.innerHTML += newColumn({ id: "0", title: "냉무" });
};

const deleteWholeColumnClickEventHandler = (e) => {
  if (e.target.className === "column-remove-btn") {
    const targetColumn = getTargetParentByClassName(e.target, "column-wrapper");
    targetColumn.remove();
  }
};

const columnEvent = () => {
  const columnsWrapperEl = document.querySelectorAll(".columns-wrapper");
  columnsWrapperEl.forEach((columnWrapper) => {
    columnWrapper.addEventListener("click", (e) => {
      columnAddBtnClickEventHandler(e);
      cardAddBtnClickEventHandler(e);
      cardCancelBtnClickEventHandler(e);
      cardRemoveClickEventHandler(e);
      deleteWholeColumnClickEventHandler(e);
    });
  });
  const removeBtnEl = document.querySelectorAll(".columns-wrapper");
  removeBtnEl.forEach((removeBtn) => {
    removeBtn.addEventListener("mouseover", (e) => {
      cardRemoveHoverEventHandler(e);
    });
  });
  removeBtnEl.forEach((removeBtn) => {
    removeBtn.addEventListener("mouseout", (e) => {
      cardRemoveOutEvenetHandler(e);
    });
  });
  const columns = document.querySelector(".add-column-btn-wrapper");
  columns.addEventListener("click", addWholeColumnClickEventHandler);
};

const logBtnClickEvent = () => {
  document.querySelector(".chat-menu-btn").addEventListener("click", () => {
    document.querySelector(".log-wrapper").classList.toggle("hidden");
  });
};

export { columnEvent, logBtnClickEvent };
