#include <stdio.h>

main()
{
	int arr[5];
	int max, min, sum, i;
	
	for (i = 0; i < 5; i++) {
		printf("�Է� = ");
		scanf_s("%d", &arr[i]); // �迭��� ���� Ư�� �� �Է¹��� �� & �����ڸ� �ٿ��� ��
	}

	max = min = sum = arr[0]; // ���� ������ ��(arr[0])�� �տ� ���� ���� �ǹ���

	for (i = 1; i < 5; i++) {
		sum += arr[i];
		if (max < arr[i]) max = arr[i];
		if (min > arr[i]) min = arr[i];
	}
	printf("\n�ִ밪 = %d \n", max);
	printf("�ּҰ� = %d \n", min);
	printf("�� �� = %d \n\n", sum);
}