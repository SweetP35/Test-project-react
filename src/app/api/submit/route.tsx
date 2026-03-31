import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.json();
        console.log('Получены данные формы:', formData);
        return NextResponse.json({
            success: true,
            message: 'Форма успешно отправлена',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        return NextResponse.json(
            { error: 'Ошибка при отправке формы' },
            { status: 500 }
        );
    }
}