#include <stdio.h>

// ��������
//int total = 0;

int AddTotal(int num);

main()
{
	int i, num;

	for (i = 0; i < 3; i++) {
		printf("�Է� %d = ", i + 1);
		scanf_s("%d", &num);

		printf("���� = %d \n\n", AddTotal(num));
	}
	// printf("total = %d \n\n", total);
}

int AddTotal(int num) {
	// ���������� ���ִ� ���
	static int total = 0; // ó�� �ѹ��� �ʱ�ȭ ��(���������� ������ ��������, ��������ó�� ����� �� ����)

	total += num;
	return total;
}