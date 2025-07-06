import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface FilterCheckboxProps {
    id: number;
    label: string;
    isSelected: boolean;
    onToggle: (id: number) => void;
}

export function FilterCheckbox({ id, label, isSelected, onToggle }: FilterCheckboxProps) {
    return (
        <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => onToggle(id)}
            activeOpacity={0.7}
        >
            <View style={[styles.checkboxBox, isSelected && styles.checkboxBoxSelected]}>
                {isSelected && <Text style={styles.checkboxTick}>✓</Text>}
            </View>
            <Text style={styles.checkboxTextNormal}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkboxBox: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: Colors.purpuraClaro,
        backgroundColor: Colors.fondo,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxBoxSelected: {
        borderColor: Colors.purpura,
        backgroundColor: Colors.purpura,
    },
    checkboxTick: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 18,
        includeFontPadding: false,
    },
    checkboxTextNormal: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
    },
}); 