#include <stdio.h>

int sum_total(int a[], int n); // �Լ� ���� ����

int main()
{
	int sum;
	int arr[10] = { 22, 11, 4, 5, 2, 7, 1, 21, 12, 9 };

	// arr�� �迭�� ù��° �ּҸ� ���� ������ ���
	sum = sum_total(arr, 10);
	printf("\n\nsum = %d \n\n", sum);
}

int sum_total(int a[], int n) // �迭�� ���� ���� �迭�̶�� ǥ���ؾ��� (a[])
{
	int sum = 0;

	for (int i = 0; i < n; i++) {
		sum += a[i];
		printf("\n sum[i+1] = %d", sum);
	}

	return sum;
}