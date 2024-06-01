import React from "react";
import styles from "./Transactions.module.css";
import { ReactComponent as SamosaIcon } from "../../assets/samosa.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/edit-icon.svg";
import { ReactComponent as MovieIcon } from "../../assets/movie-icon.svg";
import { ReactComponent as AutoIcon } from "../../assets/auto-icon.svg";
import { ReactComponent as LeftArrow } from "../../assets/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/right-arrow.svg";

function Transactions() {
    return (
        <div className={styles.wrapper}>
            <div>
                <div className={styles.lineItem}>
                    <div className={styles.item}>
                        <SamosaIcon />
                        <div className={styles.itemDetail}>
                            <p>Samosa</p>
                            <p>March 20, 2024</p>
                        </div>
                    </div>
                    <div className={styles.priceButtons}>
                        <p>₹150</p>
                        <div className={styles.icons}>
                            <DeleteIcon className="cursor-pointer" />
                            <EditIcon className="cursor-pointer" />
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div>
                <div className={styles.lineItem}>
                    <div className={styles.item}>
                        <MovieIcon />
                        <div className={styles.itemDetail}>
                            <p>Movie</p>
                            <p>March 21, 2024</p>
                        </div>
                    </div>
                    <div className={styles.priceButtons}>
                        <p>₹300</p>
                        <div>
                            <DeleteIcon className="cursor-pointer" />
                            <EditIcon className="cursor-pointer" />
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div>
                <div className={styles.lineItem}>
                    <div className={styles.item}>
                        <AutoIcon />
                        <div className={styles.itemDetail}>
                            <p>Auto</p>
                            <p>March 22, 2024</p>
                        </div>
                    </div>
                    <div className={styles.priceButtons}>
                        <p>₹50</p>
                        <div>
                            <DeleteIcon className="cursor-pointer" />
                            <EditIcon className="cursor-pointer" />
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div className={styles.pagination}>
                <button className={`${styles.arrow} cursor-pointer`}><LeftArrow /></button>
                <div className={styles.indexing}>1</div>
                <button className={`${styles.arrow} cursor-pointer`}><RightArrow /></button>
            </div>
        </div>
    )
}

export default Transactions;