#include <stdio.h>

int sum_total(int a[], int n); // 함수 원형 선언

int main()
{
	int sum;
	int arr[10] = { 22, 11, 4, 5, 2, 7, 1, 21, 12, 9 };

	// arr은 배열의 첫번째 주소를 갖는 포인터 상수
	sum = sum_total(arr, 10);
	printf("\n\nsum = %d \n\n", sum);
}

int sum_total(int a[], int n) // 배열을 받을 떄는 배열이라고 표시해야함 (a[])
{
	int sum = 0;

	for (int i = 0; i < n; i++) {
		sum += a[i];
		printf("\n sum[i+1] = %d", sum);
	}

	return sum;
}