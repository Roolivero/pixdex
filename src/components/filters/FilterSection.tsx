import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TextPressStart2P } from '../TextPressStart2P';
import { FilterCheckbox } from './FilterCheckbox';

interface FilterItem {
    id: number;
    label: string;
}

interface FilterSectionProps {
    title: string;
    items: FilterItem[];
    selectedItems: number[];
    onToggleItem: (id: number) => void;
    isLoading?: boolean;
    useGrid?: boolean;
}

export function FilterSection({ 
    title, 
    items, 
    selectedItems, 
    onToggleItem, 
    isLoading = false,
    useGrid = false 
}: FilterSectionProps) {
    if (isLoading) {
        return (
            <View style={styles.section}>
                <TextPressStart2P style={styles.sectionTitle}>{title}</TextPressStart2P>
                <TextPressStart2P style={styles.noDataText}>Cargando...</TextPressStart2P>
            </View>
        );
    }

    if (useGrid) {
        const itemsPerColumn = Math.ceil(items.length / 2);
        const column1 = items.slice(0, itemsPerColumn);
        const column2 = items.slice(itemsPerColumn);

        return (
            <View style={styles.section}>
                <TextPressStart2P style={styles.sectionTitle}>{title}</TextPressStart2P>
                <View style={styles.generosGrid}>
                    <View style={styles.generosCol}>
                        {column1.map(item => (
                            <FilterCheckbox
                                key={item.id}
                                id={item.id}
                                label={item.label}
                                isSelected={selectedItems.includes(item.id)}
                                onToggle={onToggleItem}
                            />
                        ))}
                    </View>
                    <View style={styles.generosCol}>
                        {column2.map(item => (
                            <FilterCheckbox
                                key={item.id}
                                id={item.id}
                                label={item.label}
                                isSelected={selectedItems.includes(item.id)}
                                onToggle={onToggleItem}
                            />
                        ))}
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.section}>
            <TextPressStart2P style={styles.sectionTitle}>{title}</TextPressStart2P>
            {items.map(item => (
                <FilterCheckbox
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    isSelected={selectedItems.includes(item.id)}
                    onToggle={onToggleItem}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        color: Colors.purpuraClaro,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    noDataText: {
        fontSize: 12,
        color: Colors.purpuraClaro,
        fontStyle: 'italic',
        textAlign: 'center',
        padding: 10,
    },
    generosGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    generosCol: {
        flex: 1,
    },
}); 