import React, { useEffect, useRef, useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>([]);
    const [itemId, setItemId] = useState(-1);
    const [itemValue, setItemValue] = useState('');
    const inputName = useRef<HTMLInputElement>(null);

    const sortedName = (a: IItem, b: IItem) => {
        if (props.sorting == 'ASC') {
            return a.id - b.id;
        } else if (props.sorting == 'DESC') {
            return b.id - a.id;
        } else {
            return 0;
        }
    };

    const saveData = (data: string) => {
        setItems((x) =>
            x.map((item) => {
                if (item.id === itemId) {
                    item.name = data;
                }
                return item;
            }),
        );
        setItemId(-1);
        setItemValue('');
    };

    const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                saveData(String(inputName.current?.value));
                break;
            case 'Escape':
                saveData(itemValue);
                break;
        }
    };

    const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const target = e.target as HTMLLIElement;
        const targetId = Number(target.dataset['id']);
        const value = String(target.dataset['value']);
        setItemId(targetId);
        setItemValue(value);
    };

    useEffect(() => {
        setItems(props.initialData);
    }, [props.initialData]);

    return (
        <div>
            <ul>
                {items.sort(sortedName).map(({ id, name }) =>
                    itemId === id ? (
                        <input
                            ref={inputName}
                            autoFocus
                            defaultValue={name}
                            onKeyDown={handleInput}
                            key={id}
                        />
                    ) : (
                        <li
                            key={id}
                            data-id={id}
                            data-value={name}
                            onClick={onClick}
                        >
                            {name}
                        </li>
                    ),
                )}
            </ul>
        </div>
    );
}
